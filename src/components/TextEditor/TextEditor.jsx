import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import "katex/dist/katex.min.css";

import PropTypes from "prop-types";
import SunEditor from "suneditor-react";
import katex from "katex";
import plugins from "suneditor/src/plugins";

export const defaultOptions = {
	katex: katex,
	height: 200,
	plugins: plugins,
	buttonList: [
		["undo", "redo"],
		["font", "fontSize", "formatBlock"],
		["paragraphStyle", "blockquote"],
		["bold", "underline", "italic", "strike", "subscript", "superscript"],
		["fontColor", "hiliteColor", "textStyle"],
		["removeFormat"],
		"/", // Line break
		["outdent", "indent"],
		["align", "horizontalRule", "list", "lineHeight"],
		["table", "link", "image", "video", "audio", "math" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
		/** ['imageGallery'] */ // You must add the "imageGalleryUrl".
		["fullScreen", "showBlocks" /*,"codeView" */],
		["preview", "print"],
		["save" /*,"template" */],
	],
};
TextEditor.propTypes = {
	className: PropTypes.string,
	height: PropTypes.string,
	setContents: PropTypes.string,
	setDefaultStyle: PropTypes.string,
	setOptions: PropTypes.object,
	hideToolbar: PropTypes.bool,
	disabled: PropTypes.bool,

	onChange: PropTypes.func,
};

TextEditor.defaultProps = {
	className: "",
	height: "400px",
	setContents: "",
	setDefaultStyle: "font-size:14px;",
	setOptions: defaultOptions,
	hideToolbar: false,
	disabled: false,
	onChange: () => {},
};

function TextEditor({
	className,
	height,
	setContents,
	setDefaultStyle,
	setOptions,
	hideToolbar,
	disable,
	onChange,
}) {
	return (
		<div className={`text-editor ${className}`} styles={{width: "100%"}}>
			<SunEditor
				height={height}
				onChange={onChange}
				setContents={setContents}
				setDefaultStyle={setDefaultStyle}
				hideToolbar={hideToolbar}
				disable={disable}
				setOptions={setOptions}
			/>
		</div>
	);
}

export default TextEditor;
