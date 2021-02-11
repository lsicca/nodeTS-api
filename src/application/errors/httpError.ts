class HttpError extends Error {
	status;

	reference;

	constructor(
		{ httpCode, message }: { httpCode: number; message: string },
		reference: string | undefined = undefined,
	) {
		super();
		this.status = httpCode;
		this.message = message;
		this.reference = reference;
	}
}

export default HttpError;
