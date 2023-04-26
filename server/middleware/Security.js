/**
 * The function is a security middleware that checks for potential XSS and SQL injection attacks in the
 * request parameters, body, and headers.
 * @param req - The request object, which contains information about the incoming HTTP request.
 * @param res - The `res` parameter is the response object that will be sent back to the client by the
 * server. It contains methods and properties that allow the server to send data back to the client,
 * such as `status`, `send`, and `json`.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. If there are no more middleware functions left, it passes control to the route handler
 * function.
 * @returns If any of the request parameters, body, or headers contain potential XSS or SQL injection
 * payloads, a 403 Forbidden response with a message "Forbidden request" is returned. Otherwise, the
 * middleware calls the next function in the middleware chain.
 */

function securityMiddleware(req, res, next) {
	const xssRegex =
		/(?:<[^>]*|\b)(on\w+\s*=|javascript\s*:|expression\s*\(|eval\s*\()|<\s*script|<\s*img|<\s*iframe|<\s*link|<\s*meta|<\s*form|<\s*svg|data\s*:|vbscript\s*:|<\s*object/i;

	const sqlInjectionRegex =
		/(SELECT.*FROM|INSERT INTO|UPDATE.*SET|DELETE FROM|DROP)/gi;

	const params = req.query;
	const body = req.body;
	const headers = req.headers;
	const isXSS = (data) => xssRegex.test(data);
	const isSQLI = (data) => sqlInjectionRegex.test(data);

	const checkForPayloads = (data) => {
		if (typeof data === "object") {
			for (let key in data) {
				if (isXSS(data[key]) || isSQLI(data[key])) {
					return true;
				}
				if (checkForPayloads(data[key])) {
					return true;
				}
			}
		}
		return false;
	};

	if (
		Object.keys(params).some(
			(key) => isXSS(params[key]) || isSQLI(params[key]),
		) ||
		checkForPayloads(body) ||
		Object.keys(headers).some(
			(key) => isXSS(headers[key]) || isSQLI(headers[key]),
		)
	) {
		return res
			.status(403)
			.send({ status: "Forbidden", message: "Forbidden request" });
	}

	next();
}

module.exports = {
	securityMiddleware,
};

// can be enhanced
