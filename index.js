require('dotenv').config();
const express = require('express');
const {
	getAllZips,
	addZipToDatabase,
	deleteZipFromDatabase,
	isZipInDatabase,
} = require('./firebase');
const { getZipFromPath, consolidateZips, isValidZip } = require('./utils');

const app = express();

const PORT = 8080;

app.get('/insert/:zipcode', async (req, res) => {
	const zipcode = getZipFromPath(req.path);

	const doesZipExist = await isZipInDatabase(zipcode);

	try {
		if (!isValidZip(zipcode)) {
			res.send(`Zip code must be a five digit number.`);
		} else if (doesZipExist) {
			res.send(`Zip code ${zipcode} is already in the database`);
		} else {
			addZipToDatabase(zipcode.toString());
			res.send(`Zip code ${zipcode} inserted.`);
		}
	} catch (err) {
		console.error(err);
	}
});

app.get('/delete/:zipcode', async (req, res) => {
	const zipcode = getZipFromPath(req.path);

	try {
		const doesZipExist = await isZipInDatabase(zipcode);
		if (doesZipExist) {
			await deleteZipFromDatabase(zipcode.toString());
			res.send(`Zip code ${zipcode} deleted.`);
		} else {
			res.send(`Zip code ${zipcode} not found.`);
		}
	} catch (err) {
		console.error(err);
	}
});

app.get('/has/:zipcode', async (req, res) => {
	const zipcode = getZipFromPath(req.path);
	res.send(`${await isZipInDatabase(zipcode)}`);
});

app.get('/display', async (req, res) => {
	const allZipsArray = await getAllZips();

	if (!allZipsArray.length)
		res.send(
			'no zip codes in database, to add a zip code use /insert/<zip code>'
		);
	else {
		const consolidatedZipsString = consolidateZips(allZipsArray);
		res.send(consolidatedZipsString);
	}
});

app.listen(process.env.PORT || PORT, () =>
	console.log(`listening on port ${PORT}`)
);
