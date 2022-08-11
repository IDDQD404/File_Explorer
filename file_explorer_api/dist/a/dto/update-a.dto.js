"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateADto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_a_dto_1 = require("./create-a.dto");
class UpdateADto extends (0, mapped_types_1.PartialType)(create_a_dto_1.CreateADto) {
}
exports.UpdateADto = UpdateADto;
//# sourceMappingURL=update-a.dto.js.map