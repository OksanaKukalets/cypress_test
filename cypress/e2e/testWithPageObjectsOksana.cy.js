import { navigateTo } from "../support/page_objects_Oksana/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatePickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects_Oksana/smartTablePage";

describe("Test with Page Objects", () => {
  beforeEach("Open application", () => {
    cy.openHomePage();
  });

  it("Verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only("Should submit Inline and basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Oksana",
      "test@testing.com"
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "test@testing.com",
      "password"
    );
    navigateTo.datepickerPage();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1);
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Artem", "Bondar");
    onSmartTablePage.updateAgeByFirstName("Artem", "25");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
