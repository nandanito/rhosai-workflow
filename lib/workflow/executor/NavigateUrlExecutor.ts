import { NavigateUrlTask } from '@/lib/workflow/task/NavigateUrlTask';
import { ExecutionEnvironment } from '@/types/executor';

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput('URL');
    if (!url) {
      environment.log.error('input->url not defined');
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`visited ${url}`);
    return true;
  } catch (error: unknown) {
    environment.log.error(
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
