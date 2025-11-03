import * as core from '@actions/core'
import * as tool from '@actions/tool-cache'

function getDownloadUrl(version) {
	const platform = { linux: 'Linux', darwin: 'macOS', win32: 'Windows' }[process.platform]
	const arch = { x32: '32bit', x64: '64bit', arm: 'armv6', arm64: 'arm64' }[process.arch]
	const filename = `s5cmd_${version}_${platform}-${arch}`
	const extension = process.platform === 'win32' ? 'zip' : 'tar.gz'
	return `https://github.com/peak/s5cmd/releases/download/v${version}/${filename}.${extension}`
}

try {
	const version = core.getInput('version', { required: true })
	const downloadUrl = getDownloadUrl(version)
	const archive = await tool.downloadTool(downloadUrl)
	const extract = downloadUrl.endsWith('.zip') ? tool.extractZip : tool.extractTar
	const pathToCLI = await extract(archive)
	core.addPath(pathToCLI)
} catch (err) {
	core.setFailed(String(err))
}
