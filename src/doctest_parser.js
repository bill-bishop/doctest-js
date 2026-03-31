import { parse } from 'comment-parser'

export default function parseDoctests(fileContent) {
  const blocks = parse(fileContent)
  const doctests = []

  for (const block of blocks) {
    for (const tag of block.tags) {
      if (tag.tag !== 'example') continue

      // Reconstruct from raw source lines, stripping comment markers
      const lines = tag.source.map(s => {
        // Get the raw source line and strip leading comment markers
        let line = s.source
        // Remove leading whitespace, *, /**, /*, // (but not //=>), etc.
        line = line.replace(/^\s*\/\*\*?/, '')          // /* or /** at start
        line = line.replace(/^\s*\*\/?/, '')             // * or */ at start  
        line = line.replace(/^\s*\/\/(?!=)/, '')         // // at start, but NOT //=>
        line = line.trim()
        return line
      }).filter(line => line.length > 0)
      
      // Join lines and remove @example prefix
      let body = lines.join('\n')
      body = body.replace(/^@example\s*/, '')

      const separatorIndex = body.indexOf('//=>')
      if (separatorIndex === -1) continue

      const resultString = body.slice(0, separatorIndex).trim().replace(/\n\s*/g, ' ')
      const stringToEval = body.slice(separatorIndex + 4).trim().replace(/\n\s*/g, ' ')

      if (resultString === '') continue

      doctests.push({ resultString, stringToEval })
    }
  }

  return doctests
}
