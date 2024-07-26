const os = require('os');
const path = require('path');

function mapArch(arch) {
	const mappings = {
		x32: '32bit',
		x64: '64bit',
		arm: 'armv6',
		arm64: 'arm64',
	};
	return mappings[arch] || arch;
}

function mapOS(os) {
	const mappings = {
		linux: 'Linux',
		darwin: 'macOS',
		win32: 'Windows',
	};
	return mappings[os] || os;
}

function getDownloadObject(version) {
	const platform = os.platform();
	const filename = `s5cmd_${version}_${mapOS(platform)}-${mapArch(os.arch())}`;
	const extension = platform === 'win32' ? 'zip' : 'tar.gz';
	const binPath = '';
	const url = `https://github.com/peak/s5cmd/releases/download/v${version}/${filename}.${extension}`;
	return {
		url,
		binPath,
	};
}

module.exports = { getDownloadObject };
