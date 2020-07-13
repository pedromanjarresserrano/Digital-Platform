const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'pCounter',
    meta: 'paginator'
};
const options = {
    page: 1,
    limit: 25,
    customLabels: myCustomLabels
};

const multer = require('multer')({
    dest: 'public/uploads'
})

module.exports = {
    options,
    multer
}