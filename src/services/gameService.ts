import { FormuleMode } from '../lib/formules/types';
import { ActionMode } from '../pages/actions/types';
import iaxios from './axiosInstance';

export interface GameResultCreatePayload {
    game_code: FormuleMode|ActionMode;
    formule_code: FormuleMode;
    digit_count: number;
    second_digit_count: number|null;
    number_count: number;
    is_mixed: boolean;
    game_count: number;
    between_duration: number;
    answer_duration: number;
    correct_count: number;
    wrong_count: number;
}

export const createGameResult = (gameResult: GameResultCreatePayload) => {
    return iaxios.post('/v1/students/game-results', gameResult);
}
interface GameResultUpdatePayload {
    correct_count: number;
    wrong_count: number;
}

export const updateGameResult = ({id, gameResult}: {id: string|number, gameResult: GameResultUpdatePayload}) => {
    return iaxios.put(`/v1/students/game-results/${id}`, gameResult);
}

export interface TestResultCreatePayload {
    formule_code: FormuleMode;
    digit_count: number;
    number_count: number;
    duration: number;
    finish_duration: number;
    correct_one: number;
    correct_one_and_half: number;
    correct_two: number;
    wrong_one: number;
    wrong_one_and_half: number;
    wrong_two: number;
    empty_one: number;
    empty_one_and_half: number;
    empty_two: number;
}

export const createTestResult = (testResult: TestResultCreatePayload) => {
    return iaxios.post('/v1/students/test-results', testResult);
}
