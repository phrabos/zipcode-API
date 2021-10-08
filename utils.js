function getZipFromPath(path) {
	const pathArr = path.split('/');

	return +pathArr[2];
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

module.exports = { getZipFromPath, consolidateZips };
