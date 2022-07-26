const os = require('os');
const path = require('path');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
	const mappings = {
		x32: '32bit',
		x64: '64bit',
		arm: 'armv6',
		arm64: 'arm64'
	};
	return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
	const mappings = {
		linux: 'Linux',
		darwin: 'macOS',
		win32: 'Windows'
	};
	return mappings[os] || os;
}

function getDownloadObject(version) {
	const platform = os.platform();
	const filename = `s5cmd_${ version }_${ mapOS(platform) }-${ mapArch(os.arch()) }`;
	const extension = (platform === 'win32') ? 'zip' : 'tar.gz';
	// const binPath = (platform === 'win32') ? 'bin' : path.join(filename, 'bin');
	const binPath = '';
	const url = `https://github.com/peak/s5cmd/releases/download/v${ version }/${ filename }.${ extension }`;
	return {
		url,
		binPath
	};
}

module.exports = { getDownloadObject }
