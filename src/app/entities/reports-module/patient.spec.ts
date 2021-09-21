import {Patient} from './patient';

describe('Patient', () => {
  it('should create an instance', () => {
    expect(new Patient("Иванов Иван Иванович", new Date(1997, 3, 17), 'М', '12;13;14', 'механик', 'автоцех')).toBeTruthy();
  });
});
