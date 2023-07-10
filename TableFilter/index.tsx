import React, { useEffect, useState } from "react";
import { StateFilter } from "./StateFilter";
import { WorkflowConfigFilterType } from "../../shared-types";
import { LeftFilter } from "./LeftFilter";
import { RightFilter } from "./RightFilter";

export interface FilterProps{
  availableFilters?: WorkflowConfigFilterType[],
  availableSteps: { name: string, _id: string }[],
  filterStep: string[] | undefined;
  setFilterStep: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  filterDynamicFields: Record<string,{ value: any, ref: (string | string[]), type: WorkflowConfigFilterType['type'] }>,
  setFilterDynamicFields: React.Dispatch<React.SetStateAction<Record<string,{ value: any, ref: (string | string[]), type: WorkflowConfigFilterType['type'] }>>>,
  isFiltering: boolean,
  handleDeleteMultiple: () => void,
  hasSelectedForDelete: boolean,
}
export const TableFilter = ({
  availableFilters,
  isFiltering, availableSteps,
  filterStep,
  setFilterStep,
  filterDynamicFields,
  setFilterDynamicFields,
  handleDeleteMultiple, hasSelectedForDelete
} : FilterProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string[]>(filterStep ?? []);
  const [dynamicFilter, setDynamicFilter] = useState<Record<string,{ value: any, ref: (string | string[]), type: WorkflowConfigFilterType['type'] }>>({});

  useEffect(() => {
    setIsApplied(
      JSON.stringify([
        (selectedStep.length === 0 ? undefined : selectedStep),
        dynamicFilter
      ]) === JSON.stringify([
        filterStep,
        filterDynamicFields
      ])
    )
  },[
    selectedStep,
    filterStep,
    dynamicFilter,
    filterDynamicFields,
  ]);

  function handleApplyFilter(){
    if(JSON.stringify(selectedStep) !== JSON.stringify(filterStep)) setFilterStep(
      selectedStep.length === 0 || selectedStep.length === (availableSteps ?? []).length ? undefined : selectedStep
    );
    if(JSON.stringify(dynamicFilter) !== JSON.stringify(filterDynamicFields)) setFilterDynamicFields(
      dynamicFilter
    ); 

    setIsApplied(true);
  }

  return (
    <div className="
      relative bg-gradient-light backdrop-blur-[25px] rounded-lg shadow-md
      flex flex-col gap-2 mt-4 px-4 py-3 text-primary-700 mb-4 z-10
    ">
      <div className="flex flex-wrap justify-between gap-2 min-h-[2rem]">
        <LeftFilter {...{
          selectedStep,
          setSelectedStep,
          availableSteps,
          hasSelectedForDelete,
          handleDeleteMultiple
        }}/>
        {availableFilters && availableFilters.length > 0 && (
          <RightFilter {...{
            availableFilters,
            setDynamicFilter,
            dynamicFilter,
          }}/>
        )}
      </div>

      {(isFiltering || !isApplied) && (
        <StateFilter {...{
          availableSteps,
          isApplied,
          selectedStep, 
          setSelectedStep, 
          handleApplyFilter,
          dynamicFilter,
          setDynamicFilter,
        }}/>
      )}
    </div>
  );
}