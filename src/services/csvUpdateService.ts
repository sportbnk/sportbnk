
import { supabase } from "@/integrations/supabase/client";

export interface BatchUpdateResult {
  processed: number;
  successful: number;
  notFound?: number;
  notFoundNames?: string[];
  errors: string[];
  isComplete: boolean;
  nextStartRow: number;
  totalRows: number;
}

export class CsvUpdateService {
  private static async processBatch(
    functionName: string,
    payload: any,
    signal?: AbortSignal
  ): Promise<BatchUpdateResult> {
    if (signal?.aborted) {
      throw new DOMException('Operation was aborted', 'AbortError');
    }

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload,
    });

    if (error) {
      throw new Error(`Failed to process batch: ${error.message}`);
    }

    return data;
  }

  static async updateTeamsCsv(
    csvData: string,
    selectedColumns: string[],
    nullifyEmpty: boolean,
    batchSize: number = 100,
    onProgress?: (result: BatchUpdateResult) => void,
    signal?: AbortSignal,
    startingRow: number = 1
  ): Promise<BatchUpdateResult> {
    let startRow = startingRow;
    let totalProcessed = 0;
    let totalSuccessful = 0;
    let totalNotFound = 0;
    let allNotFoundNames: string[] = [];
    let allErrors: string[] = [];
    let isComplete = false;

    while (!isComplete) {
      if (signal?.aborted) {
        throw new DOMException('Operation was aborted', 'AbortError');
      }

      const result = await this.processBatch('update-teams-csv', {
        csvData,
        selectedColumns,
        nullifyEmpty,
        startRow,
        batchSize,
      }, signal);

      totalProcessed += result.processed;
      totalSuccessful += result.successful;
      totalNotFound += (result.notFound || 0);
      allNotFoundNames = [...allNotFoundNames, ...(result.notFoundNames || [])];
      allErrors = [...allErrors, ...result.errors];
      
      startRow = result.nextStartRow;
      isComplete = result.isComplete;

      const adjustedProcessed = (startingRow - 1) + totalProcessed;
      const adjustedTotalRows = Math.max(result.totalRows, adjustedProcessed);

      const progressResult: BatchUpdateResult = {
        processed: adjustedProcessed,
        successful: totalSuccessful,
        notFound: totalNotFound,
        notFoundNames: allNotFoundNames,
        errors: allErrors,
        isComplete,
        nextStartRow: startRow,
        totalRows: adjustedTotalRows,
      };

      if (onProgress) {
        onProgress(progressResult);
      }

      if (!isComplete) {
        if (signal?.aborted) {
          throw new DOMException('Operation was aborted', 'AbortError');
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      processed: (startingRow - 1) + totalProcessed,
      successful: totalSuccessful,
      notFound: totalNotFound,
      notFoundNames: allNotFoundNames,
      errors: allErrors,
      isComplete: true,
      nextStartRow: startRow,
      totalRows: Math.max(totalProcessed, (startingRow - 1) + totalProcessed),
    };
  }

  static async updateContactsCsv(
    csvData: string,
    selectedColumns: string[],
    nullifyEmpty: boolean,
    batchSize: number = 50,
    onProgress?: (result: BatchUpdateResult) => void,
    signal?: AbortSignal,
    startingRow: number = 1
  ): Promise<BatchUpdateResult> {
    let startRow = startingRow;
    let totalProcessed = 0;
    let totalSuccessful = 0;
    let totalNotFound = 0;
    let allNotFoundNames: string[] = [];
    let allErrors: string[] = [];
    let isComplete = false;

    while (!isComplete) {
      if (signal?.aborted) {
        throw new DOMException('Operation was aborted', 'AbortError');
      }

      const result = await this.processBatch('update-contacts-csv', {
        csvData,
        selectedColumns,
        nullifyEmpty,
        startRow,
        batchSize,
      }, signal);

      totalProcessed += result.processed;
      totalSuccessful += result.successful;
      totalNotFound += (result.notFound || 0);
      allNotFoundNames = [...allNotFoundNames, ...(result.notFoundNames || [])];
      allErrors = [...allErrors, ...result.errors];
      
      startRow = result.nextStartRow;
      isComplete = result.isComplete;

      const adjustedProcessed = (startingRow - 1) + totalProcessed;
      const adjustedTotalRows = Math.max(result.totalRows, adjustedProcessed);

      const progressResult: BatchUpdateResult = {
        processed: adjustedProcessed,
        successful: totalSuccessful,
        notFound: totalNotFound,
        notFoundNames: allNotFoundNames,
        errors: allErrors,
        isComplete,
        nextStartRow: startRow,
        totalRows: adjustedTotalRows,
      };

      if (onProgress) {
        onProgress(progressResult);
      }

      if (!isComplete) {
        if (signal?.aborted) {
          throw new DOMException('Operation was aborted', 'AbortError');
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      processed: (startingRow - 1) + totalProcessed,
      successful: totalSuccessful,
      notFound: totalNotFound,
      notFoundNames: allNotFoundNames,
      errors: allErrors,
      isComplete: true,
      nextStartRow: startRow,
      totalRows: Math.max(totalProcessed, (startingRow - 1) + totalProcessed),
    };
  }
}
