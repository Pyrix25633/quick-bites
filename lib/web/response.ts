import { NextResponse } from "next/server";

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

export class UnprocessableContentResponse extends Response {
    constructor() {
        super(null, { status: 422, statusText: "Unprocessable Content" });
    }
}

export class InternalServerErrorResponse extends Response {
    constructor() {
        super(null, { status: 500, statusText: "Internal Server Error" });
    }
}

export class NoContentNextResponse extends NextResponse {
    static next(): NextResponse {
        return NextResponse.next({ status: 204, statusText: "No Content" });
    }
}

export class OkNextResponse extends NextResponse {
    static json<JsonBody>(body: JsonBody): NextResponse<JsonBody> {
        return NextResponse.json(body, { status: 200, statusText: "OK" });
    }
}
