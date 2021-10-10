describe('doc core', () => {
    const CONTENT_TEST = "(title) Title code example (/title)\nNoi dung dung của test \n(code) const test = 123; const a = (value)=>{ return value; } (/code)"
    it('layout string', () => {
        const output = layoutString(CONTENT_TEST);
        console.log(output);
    })
})