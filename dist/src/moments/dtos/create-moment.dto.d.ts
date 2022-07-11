import { MemoryStoredFile } from 'nestjs-form-data';
export declare class CreateMomentDto {
    pin_x: number;
    pin_y: number;
    title: string;
    description: string;
    imageFile: MemoryStoredFile;
    youtubeUrl: string;
    music: string;
    artist: string;
}
