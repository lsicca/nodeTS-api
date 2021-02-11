class InternalError extends Error {
	status = 500;

	message = 'An internal error happened';
}

export default InternalError;
