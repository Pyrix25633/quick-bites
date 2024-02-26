export function createOkResponse(): Response {
    return new Response(null, {status: 200, statusText: "OK"});
}

export function createCreatedResponse(): Response {
    return new Response(null, {status: 201, statusText: "Created"});
}

export function createBadRequestResponse(): Response {
    return new Response(null, {status: 400, statusText: "Bad Request"});
}

export function createUnauthorizedResponse(): Response {
    return new Response(null, {status: 401, statusText: "Anauthorized"});
}

export function createForbiddenResponse(): Response {
    return new Response(null, {status: 403, statusText: "Forbidden"});
}

export function createNotFoundResponse(): Response {
    return new Response(null, {status: 404, statusText: "Not Found"});
}

export function createInternalServerErrorResponse(): Response {
    return new Response(null, {status: 500, statusText: "Internal Server Error"});
}