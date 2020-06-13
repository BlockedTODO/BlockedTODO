const inlineCode = (text) => {
    return '`' + text + '`';
};

const codeBlock = (text) => {
    return '```\n' + text + '\n```';
};

const lineBreak = () => {
    return '\n\n<br />\n\n';
};

module.exports = {
    inlineCode,
    codeBlock,
    lineBreak,
};
