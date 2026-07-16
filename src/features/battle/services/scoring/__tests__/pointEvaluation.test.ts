import { evaluateObjectivePoints } from '../pointEvaluation';

describe('evaluateObjectivePoints', () => {
  it('returns zero when the objective has no awarded points', () => {
    expect(evaluateObjectivePoints({ pointsEarned: undefined } as any)).toBe(0);
  });

  it('returns the awarded points when they exist', () => {
    expect(evaluateObjectivePoints({ pointsEarned: 7 } as any)).toBe(7);
  });
});
