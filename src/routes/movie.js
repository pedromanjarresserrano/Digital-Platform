let fs = require('fs')
let express = require('express');
const models = require('../models');
const { log } = require('console');
let router = express.Router();

//
//	Stream the movie
//
router.get('/:_id', async function (req, res) {

	try {
		const { _id } = req.params;
		const movie = await models.moviemodel.findById(_id);
		if (!movie)
			return res.status(404).send({ message: 'The movie does not exist ' })
		const path = movie.url;
		const stat = fs.statSync(path)
		const fileSize = stat.size
		const range = req.headers.range
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-")
			const start = parseInt(parts[0], 10)
			const end = parts[1]
				? parseInt(parts[1], 10)
				: fileSize - 1
			const chunksize = (end - start) + 1
			const file = fs.createReadStream(path, { start, end })
			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mp4',
			}
			res.writeHead(206, head);
			file.pipe(res);
		} else {
			const head = {
				'Content-Length': fileSize,
				'Content-Type': 'video/mp4',
			}
			res.writeHead(200, head)
			fs.createReadStream(path).pipe(res)
		}


	} catch (error) {
		res.send({ msg: "error", error })
	}
});

module.exports = router;