const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const zipcodeRef = db.collection('zipcodes');

async function getAllZips() {
	try {
		const allZipDocs = await zipcodeRef.get();
		const allZipsArr = [];
		allZipDocs.forEach((doc) => {
			allZipsArr.push(+doc.id);
		});
		return allZipsArr;
	} catch (err) {
		console.error(err);
	}
}

async function isZipInDatabase(zipcode) {
	const allZipsArr = await getAllZips();

	return allZipsArr.includes(zipcode);
}

async function addZipToDatabase(zipcode) {
	try {
		await zipcodeRef.doc(zipcode).set({ zipcode: +zipcode });
	} catch (err) {
		console.error(err);
	}
}

async function deleteZipFromDatabase(zipcode) {
	try {
		await zipcodeRef.doc(zipcode).delete();
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	getAllZips,
	addZipToDatabase,
	deleteZipFromDatabase,
	isZipInDatabase,
};
