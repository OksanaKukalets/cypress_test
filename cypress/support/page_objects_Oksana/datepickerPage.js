function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  let futureDay = date.getDate();
  let futureMonth = date.getMonth();
  let futureMonth2 = date.toLocaleString("default", { month: "short" });
  let dateAssert = futureMonth2 + " " + futureDay + ", " + date.getFullYear();
  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then(dateAttribute => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get("[date-name='chevron-right']").click();
        selectDayFromCurrent(day);
      } else {
        // cy.get("nb-calendar-day-picker")
        //   .contains(futureDay)
        //   .click();
        cy.get(".day-cell")
          .not(".bounding-month")
          .contains(futureDay)
          .click();
      }
    });
  return dateAssert;
}

export class DatepickerPage {
  selectCommonDatepickerDateFromToday(dayFromToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then(input => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(dayFromToday);
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert);
      });
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker with Range")
      .find("input")
      .then(input => {
        cy.wrap(input).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + " - " + dateAssertSecond;
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", finalDate);
        cy.wrap(input).should("have.value", finalDate);
      });
  }
}

export const onDatePickerPage = new DatepickerPage();
