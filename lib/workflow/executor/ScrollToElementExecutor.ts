import { ScrollToElementTask } from '@/lib/workflow/task/ScrollToElement';
import { ExecutionEnvironment } from '@/types/executor';

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('input->selector not defined');
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error('element not found');
      }
      const top = element.getBoundingClientRect().top;
      window.scrollTo({ top });
    }, selector);

    return true;
  } catch (error: unknown) {
    environment.log.error(
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
