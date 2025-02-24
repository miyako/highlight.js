/*
Language: 4D
Author: Guillaume Kotulski <guillaume.kotulski@4d.com>
Website: https://www.4d.com
*/

module.exports = function(hljs) {

  var KEYWORDS = {
    className: 'keyword',
    begin: '[\\s]*\\b(Begin SQL|End SQL|End for each|End for|For each|End if|If|Else|Case of|End case|For|End use|Use|End while|While|Repeat|Until|Class extends|Class constructor|exposed Function get|exposed Function set|exposed Function|local Function get|local Function set|local Function|Function|Alias|var|break|continue|return)\\b'
  };
  
  var LITERALS = {
    className: 'literal',
    begin: '\\b(False|True|Null|Undefined|This)',
  };

  var FUNCTIONS = {
    className: 'function',
    begin: '[^\\s].+(?=\\()',
  }

  var DATE = {
    className: 'literal',
    begin: '![0-9]+',
    end: '!'
  }

  var HOUR = {
    className: 'literal',
    begin: '\\?[0-9]+',
    end: '\\?'
  }

  var NUMBERS = {
    className: 'number',
    begin: '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b[\\d]+(\\.[\\d]*)?|\\.[\\d]+)([eE][-+]?[\\d]+)?)(?!D)'
  };
  //Does not support unicode characters (should be replaced by \p{L} when possible)
  var VARIABLE = {
    className: 'variable',
    begin: '[^:\\(\\)*\\/\\|\\.=\\$\\<\\>\\#\\\'\\[\\]\"\\-\\!\\%\\&\\~\\+\\,\\;\\s]+'
  }

  var LOCAL_VARIABLE = {
    className: 'variable',
    begin: '\\$' + VARIABLE.begin,
  }

  var INTERPROCESS_VARIABLE = {
    className: 'variable',
    begin: '<>'+ VARIABLE.begin,
  }

  var STRINGS = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    relevance: 0
  }

  var VARIABLE_ARRAY = {
    className: 'variable',
    begin: '\\[{2}',
    end: '\\]{2}'
  }

  var INLINE_COMMENT = hljs.COMMENT('//', '[^\\\\]$');
  var INLINE_COMMENT_OLD = hljs.COMMENT('`', '[^\\\\]$');

  return {
    aliases: [ '4d' ],
    keyword:KEYWORDS,
    contains: [
      INLINE_COMMENT, // single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // comment blocks
      INLINE_COMMENT_OLD,
      {
        begin: 'Begin SQL', end: 'End SQL',
        subLanguage: 'sql',
        relevance: 0
      },

      DATE,
      HOUR,
      KEYWORDS,
      INTERPROCESS_VARIABLE,
      LOCAL_VARIABLE,
      VARIABLE_ARRAY,
      STRINGS,
      NUMBERS,
      LITERALS,
      FUNCTIONS,
    ]
  };
}
