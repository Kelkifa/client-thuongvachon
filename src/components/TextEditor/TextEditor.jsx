import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import "katex/dist/katex.min.css";
import "./textEditor.scss";

import PropTypes from "prop-types";
import SunEditor from "suneditor-react";
import katex from "katex";
import plugins from "suneditor/src/plugins";

export const defaultOptions = {
	katex: katex,
	height: 200,
	plugins: plugins,
	buttonList: [
		["font", "fontSize", "formatBlock"],
		["bold", "underline", "italic", "strike"],
		["align", "horizontalRule", "list", "lineHeight"],
		["paragraphStyle", "blockquote"],
		// ["removeFormat"],
		["subscript", "superscript", "math" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.],
		["fontColor", "hiliteColor", "textStyle"],
		// "/", // Line break
		["outdent", "indent"],
		["fullScreen", "showBlocks" /*,"codeView" */],
		["undo", "redo"],
		["table", "link", "image" /*, "video" */, "audio"], ///
		/** ['imageGallery'] */
		// You must add the "imageGalleryUrl".
		// ["preview", "print"],
		// ["save" /*,"template" */],
	],
};
TextEditor.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string,
	setContents: PropTypes.string,
	setDefaultStyle: PropTypes.string,
	setOptions: PropTypes.object,
	hideToolbar: PropTypes.bool,
	disabled: PropTypes.bool,

	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};

TextEditor.defaultProps = {
	className: "",
	name: "",
	height: "400px",
	setContents: "",
	setDefaultStyle: "font-size:16px;color:rgba(255, 255, 255, 0.85);",
	setOptions: defaultOptions,
	hideToolbar: false,
	disabled: false,
	onChange: () => {},
	onBlur: () => {},
};

function TextEditor({
	className,
	name,
	height,
	setContents,
	setDefaultStyle,
	setOptions,
	hideToolbar,
	disable,
	onChange,
	onBlur,
}) {
	const handleBlur = e => {
		onBlur({target: {name}});
	};
	const handleChange = value => {
		const data = {
			target: {
				name,
				value,
			},
		};

		onChange(data);
	};
	return (
		<div className={`text-editor ${className}`} styles={{width: "100%"}}>
			<SunEditor
				height={height}
				setContents={setContents}
				setDefaultStyle={setDefaultStyle}
				hideToolbar={hideToolbar}
				disable={disable}
				setOptions={setOptions}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
		</div>
	);
}

export default TextEditor;
