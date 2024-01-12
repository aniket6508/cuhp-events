import React from "react";
import { InstitutionList,DepartmentList } from "../../InstitutionDeptartmentList";


export const RoleOptions = () => {
  return (
    <>
      <option value="">Select</option>

      <option value="faculty">Faculty</option>
      {process.env.REACT_APP_HOD_FEATURE === "true" && (
        <option value="hod">HOD</option>
      )}

      {process.env.REACT_APP_ADMIN_SIGN_UP === "true" && (
        <option value="admin">Admin</option>
      )}
    </>
  );
};

export const InstitutionOptions = () => {
  return (
    <>
      <option value="">Select</option>
      {Object.keys(InstitutionList).map((key) => (
        <option key={key} value={key}>
          {InstitutionList[key]}
        </option>
      ))}
    </>
  );
};


// let departmentNames;
export const DepartmentOptions = ({ institution }) => {

  let departmentNames = DepartmentList[institution];
  console.log("departmentNames",departmentNames)
  return (
    <> 
      <option value="">Select</option>
      {Object.keys(departmentNames).map((key) => {
          return (
            <option key={key} value={key}>
              {departmentNames[key]}
            </option>
          );
      })}
    </>
  );
}

