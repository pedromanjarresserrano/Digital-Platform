import React from 'react';

class Select extends Component {
    constructor(props) {
        super(props)

        this.state = {
            values: [],
            focusedValue: -1,
            isFocused: false,
            isOpen: false,
            typed: ''
        }

        this.onFocus = this.onFocus()
        this.onBlur = this.onBlur()
        this.onKeyDown = this.onKeyDown()

        this.onClick = this.onClick()
        this.onDeleteOption = this.onDeleteOption()
        this.onHoverOption = this.onHoverOption()
        this.onClickOption = this.onClickOption()

        this.renderOption = this.renderOption()
    }

    onFocus() {
        this.setState({
            isFocused: true
        })
    }

    onBlur() {
        const { options, multiple } = this.props

        this.setState(prevState => {
            const { values } = prevState

            if (multiple) {
                return {
                    focusedValue: -1,
                    isFocused: false,
                    isOpen: false
                }
            } else {
                const value = values[0]

                let focusedValue = -1

                if (value) {
                    focusedValue = options.findIndex(option => option.value === value)
                }

                return {
                    focusedValue,
                    isFocused: false,
                    isOpen: false
                }
            }
        })
    }

    onKeyDown(e) {
        const { options, multiple } = this.props
        const { isOpen } = this.state

        switch (e.key) {
            case ' ':
                e.preventDefault()
                if (isOpen) {
                    if (multiple) {
                        this.setState(prevState => {
                            const { focusedValue } = prevState

                            if (focusedValue !== -1) {
                                const [...values] = prevState.values
                                const value = options[focusedValue].value
                                const index = values.indexOf(value)

                                if (index === -1) {
                                    values.push(value)
                                } else {
                                    values.splice(index, 1)
                                }

                                return { values }
                            }
                        })
                    }
                } else {
                    this.setState({
                        isOpen: true
                    })
                }
                break
            case 'Escape':
            case 'Tab':
                if (isOpen) {
                    e.preventDefault()
                    this.setState({
                        isOpen: false
                    })
                }
                break
            case 'Enter':
                this.setState(prevState => ({
                    isOpen: !prevState.isOpen
                }))
                break
            case 'ArrowDown':
                e.preventDefault()
                this.setState(prevState => {
                    let { focusedValue } = prevState

                    if (focusedValue < options.length - 1) {
                        focusedValue++

                        if (multiple) {
                            return {
                                focusedValue
                            }
                        } else {
                            return {
                                values: [options[focusedValue].value],
                                focusedValue
                            }
                        }
                    }
                })
                break
            case 'ArrowUp':
                e.preventDefault()
                this.setState(prevState => {
                    let { focusedValue } = prevState

                    if (focusedValue > 0) {
                        focusedValue--

                        if (multiple) {
                            return {
                                focusedValue
                            }
                        } else {
                            return {
                                values: [options[focusedValue].value],
                                focusedValue
                            }
                        }
                    }
                })
                break
            default:
                if (/^[a-z0-9]$/i.test(e.key)) {
                    const char = e.key

                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.setState({
                            typed: ''
                        })
                    }, 1000)

                    this.setState(prevState => {
                        const typed = prevState.typed + char
                        const re = new RegExp(`^${typed}`, 'i')
                        const index = options.findIndex(option => re.test(option.value))

                        if (index === -1) {
                            return {
                                typed
                            }
                        }

                        if (multiple) {
                            return {
                                focusedValue: index,
                                typed
                            }
                        } else {
                            return {
                                values: [options[index].value],
                                focusedValue: index,
                                typed
                            }
                        }
                    })
                }
                break
        }
    }

    onClick() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    onDeleteOption(e) {
        const { value } = e.currentTarget.dataset

        this.setState(prevState => {
            const [...values] = prevState.values
            const index = values.indexOf(value)

            values.splice(index, 1)

            return { values }
        })
    }

    onHoverOption(e) {
        const { options } = this.props

        const { value } = e.currentTarget.dataset
        const index = options.findIndex(option => option.value === value)

        this.setState({
            focusedValue: index
        })
    }

    onClickOption(e) {
        const { multiple } = this.props

        const { value } = e.currentTarget.dataset

        this.setState(prevState => {
            if (!multiple) {
                return {
                    values: [value],
                    isOpen: false
                }
            }

            const [...values] = prevState.values
            const index = values.indexOf(value)

            if (index === -1) {
                values.push(value)
            } else {
                values.splice(index, 1)
            }

            return { values }
        });
    }

    stopPropagation(e) {
        e.stopPropagation()
    }

    renderValues() {
        const { placeholder, multiple } = this.props
        const { values } = this.state

        if (values.length === 0) {
            return (
                <div className="placeholder">
                    {placeholder}
                </div>
            )
        }

        if (multiple) {
            return values.map(value => {
                return (
                    <span
                        key={value}
                        onClick={this.stopPropagation}
                        className="multiple value"
                    >
                        {value}
                        <span
                            data-value={value}
                            onClick={this.onDeleteOption}
                            className="delete"
                        >
                            <X />
                        </span>
                    </span>
                )
            })
        }

        return (
            <div className="value">
                {values[0]}
            </div>
        )
    }

    renderOptions() {
        const { options } = this.props
        const { isOpen } = this.state;

        if (!isOpen) {
            return null
        }

        return (
            <div className="options">
                {options.map(this.renderOption)}
            </div>
        )
    }

    renderOption(option, index) {
        const { multiple } = this.props
        const { values, focusedValue } = this.state

        const { value } = option

        const selected = values.includes(value)

        let className = "option"
        if (selected) className += " selected"
        if (index === focusedValue) className += " focused"

        return (
            <div
                key={value}
                data-value={value}
                className={className}
                onMouseOver={this.onHoverOption}
                onClick={this.onClickOption}
            >
                {multiple ?
                    <span className="checkbox">
                        {selected ? <Check /> : null}
                    </span> :
                    null
                }
                {value}
            </div>
        )
    }

    render() {
        const { label } = this.props
        const { isOpen } = this.state

        return (
            <div
                className="select"
                tabIndex="0"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
            >
                <label className="label">{label}</label>
                <div className="selection" onClick={this.onClick}>
                    {this.renderValues()}
                    <span className="arrow">
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </span>
                </div>
                {this.renderOptions()}
            </div>
        )
    }
}