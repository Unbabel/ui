export default {
	props: {
		size: {
			type: String,
			required: false,
			default() {
				return '';
			},
			validator(kind) {
				return [
					'',
					'big',
					'bigger',
				].includes(kind);
			},
		},
	},
}
