import React from "react";
import { InstitutionList, DepartmentList } from "../../InstitutionDeptartmentList";

// Component to render role options for signup
export const RoleOptions = () => {
  return (
    <>
      <option value="">Select</option>

      <option value="faculty">Faculty</option>
      {/* Display HOD option if the feature is enabled */}
      {process.env.REACT_APP_HOD_FEATURE === "true" && (
        <option value="hod">HOD</option>
      )}
      {/* Display Admin option if the feature is enabled */}
      {process.env.REACT_APP_ADMIN_SIGN_UP === "true" && (
        <option value="admin">Admin</option>
      )}
    </>
  );
};

// Component to render institution options for signup
export const InstitutionOptions = () => {
  return (
    <>
      <option value="">Select</option>
      {/* Iterate through the InstitutionList and render options */}
      {Object.keys(InstitutionList).map((key) => (
        <option key={key} value={key}>
          {InstitutionList[key]}
        </option>
      ))}
    </>
  );
};

// Component to render department options based on the selected institution for signup
export const DepartmentOptions = ({ institution }) => {
  // Get the department names based on the selected institution
  let departmentNames = DepartmentList[institution];
  console.log("departmentNames", departmentNames);

  return (
    <>
      <option value="">Select</option>
      {/* Iterate through the department names and render options */}
      {Object.keys(departmentNames).map((key) => {
        return (
          <option key={key} value={key}>
            {departmentNames[key]}
          </option>
        );
      })}
    </>
  );
};
