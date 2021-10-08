function getZipFromPath(path) {
	const pathArr = path.split('/');

	return +pathArr[2];
}

function isValidZip(zipcode) {
	const regex = /\b[0-9]{5}\b/;
	const stringZip = zipcode.toString();
	return !!stringZip.match(regex);
}

function consolidateZips(arrOfZips) {
	let start = 0;
	let end = 0;
	const arr = arrOfZips.sort().reduce((acc, curr, i, a) => {
		if (curr + 1 === a[i + 1]) {
			end = i + 1;
		} else if (curr + 1 !== a[i + 1] && end - start > 0) {
			acc.push(`${a[start]}-${curr}`);
			start = i + 1;
			end = i + 1;
		} else {
			acc.push(curr);
			start = i + 1;
			end = i + 1;
		}
		return acc;
	}, []);

	const strOfZips = arr.join(',');

	return strOfZips;
}

module.exports = { getZipFromPath, consolidateZips, isValidZip };
