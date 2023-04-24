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
