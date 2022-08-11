import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
export declare class AService {
    create(createADto: CreateADto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateADto: UpdateADto): string;
    remove(id: number): string;
}
