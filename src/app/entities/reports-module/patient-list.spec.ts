import {PatientList} from './patient-list';
import {Patient} from "./patient";

describe('PatientList', () => {
    it('should create an instance', () => {
        // @ts-ignore
        expect(new PatientList("МНКТ", 'медкнижка', [new Patient("Иванов Иван Иванович", new Date(1997, 3, 17), 'М', '12;13;14', 'механик', 'автоцех')], new Date())).toBeTruthy();
    });
});
