export default function getDayName(day: number): string {
    switch(day) {
        case 1: return 'Lun';
        case 2: return 'Mar';
        case 3: return 'Mer';
        case 4: return 'Gio';
        case 5: return 'Ven';
        case 6: return 'Sab';
        default: return 'Dom';
    }
}