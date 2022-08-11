import { AService } from './a.service';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
export declare class AController {
    private readonly aService;
    constructor(aService: AService);
    create(createADto: CreateADto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateADto: UpdateADto): string;
    remove(id: string): string;
}
