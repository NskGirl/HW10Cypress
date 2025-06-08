import { faker } from '@faker-js/faker';

describe('Test Goals on ClickUP', () => {
  it('Get created goals test case', () => {
    // Create first goal
    cy.CreateGoal().then((res1) => {
      cy.wrap(res1.body.goal.id).as('goalId1');
    });

    // Create second goal
    cy.CreateGoal().then((res2) => {
      cy.wrap(res2.body.goal.id).as('goalId2');
    });

    // After both goals are created
    cy.get('@goalId1').then((id1) => {
      cy.get('@goalId2').then((id2) => {
        // Get goals and validate
        cy.SentRequest('team/90151259069/goal', 'GET').then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.goals[0].id).to.eq(id1);
          expect(res.body.goals[1].id).to.eq(id2);
        });

        // Delete both goals
        cy.DeleteGoal('goal/' + id1).then((resDel1) => {
          expect(resDel1.status).to.eq(200);
        });

        cy.DeleteGoal('goal/' + id2).then((resDel2) => {
          expect(resDel2.status).to.eq(200);
        });
      });
    });
  });

  it('Create goal test case', () => {
    // Create valid goal
    cy.CreateGoal().then((res1) => {
      cy.wrap(res1.body.goal.id).as('goalId1');
      expect(res1.status).to.eq(200);

      // Create goal with not valid space id
      cy.SentRequest('team/not_valid/goal', 'GET').then((res) => {
        expect(res.status).to.eq(400);
      });

      // delete goal
      cy.get('@goalId1').then((id1) => {
        cy.DeleteGoal('goal/' + id1).then((resDel1) => {
          expect(resDel1.status).to.eq(200);
        });
      });
    });
  });

  it('Get goal test case', () => {
    // Create valid goal
    cy.CreateGoal().then((res1) => {
      cy.wrap(res1.body.goal.id).as('goalId1');
      expect(res1.status).to.eq(200);

      // Get goal
      cy.get('@goalId1').then((id1) => {
        // Get goals and validate
        cy.GetGoal('goal/' + id1).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.goal.id).to.eq(id1);
        });

        // delete goal
        cy.get('@goalId1').then((id1) => {
          cy.DeleteGoal('goal/' + id1).then((resDel1) => {
            expect(resDel1.status).to.eq(200);
          });
        });
      });
    });
  });

  it('Update goal test case', () => {
    // Create valid goal
    cy.CreateGoal().then((res1) => {
      cy.wrap(res1.body.goal.id).as('goalId1');
      expect(res1.status).to.eq(200);

      // Update goal
      cy.get('@goalId1').then((id1) => {
        cy.SentRequest('goal/' + id1, 'PUT', {
          name: faker.internet.username(),
        }).then((responseObject) => {
          expect(responseObject.status).to.eq(200);
        });

        // Update with not valid goal id
        cy.SentRequest('goal/not_valid', 'PUT', {
          name: faker.internet.username(),
        }).then((responseObject) => {
          expect(responseObject.status).to.eq(500);
        });

        // delete goal
        cy.get('@goalId1').then((id1) => {
          cy.DeleteGoal('goal/' + id1).then((resDel1) => {
            expect(resDel1.status).to.eq(200);
          });
        });
      });
    });
  });

  it('Delete goal test case', () => {
    // Create valid goal
    cy.CreateGoal().then((res1) => {
      cy.wrap(res1.body.goal.id).as('goalId1');
      expect(res1.status).to.eq(200);
    });
    // delete goal with not valid id
    cy.DeleteGoal('goal/not_valid').then((resDel1) => {
      expect(resDel1.status).to.eq(500);
    });

    // delete goal
    cy.get('@goalId1').then((id1) => {
      cy.DeleteGoal('goal/' + id1).then((resDel1) => {
        expect(resDel1.status).to.eq(200);
      });
    });
  });
});
