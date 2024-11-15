import useFlowValidation from '@/components/hooks/useFlowValidation';
import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from '@/lib/workflow/executionPlan';
import { AppNode, AppNodeMissingInputs } from '@/types/appNode';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { toast } from 'sonner';

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: unknown) => {
      if (typeof error !== 'object' || error === null) {
        toast.error('Unknown error occurred');
        return;
      }

      const errorWithType = error as {
        type: FlowToExecutionPlanValidationError;
      };
      switch (errorWithType.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('No entry point found');
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error('Not all inputs values are set');
          setInvalidInputs(
            (error as { invalidElements: AppNodeMissingInputs[] })
              .invalidElements
          );
          break;
        default:
          toast.error('something went wrong');
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
