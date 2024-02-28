export class OkResponse extends Response {
    constructor(body: object | null = null) {
        super(body == null ? null : JSON.stringify(body), {
            status: 200,
            statusText: "OK"
        });
    }
}

export class CreatedResponse extends Response {
    constructor(body: object | null = null) {
        super(body == null ? null : JSON.stringify(body), {
            status: 201,
            statusText: "Created"
        });
    }
}

export class BadRequestResponse extends Response {
    constructor() {
        super(null, { status: 400, statusText: "Bad Request" });
    }
}

export class UnauthorizedResponse extends Response {
    constructor() {
        super(null, { status: 401, statusText: "Unauthorized" });
    }
}

export class ForbiddenResponse extends Response {
    constructor() {
        super(null, { status: 403, statusText: "Forbidden" });
    }
}

export class NotFoundResponse extends Response {
    constructor() {
        super(null, { status: 404, statusText: "Not Found" });
    }
}

export class InternalServerErrorResponse extends Response {
    constructor() {
        super(null, { status: 500, statusText: "Internal Server Error" });
    }
}
