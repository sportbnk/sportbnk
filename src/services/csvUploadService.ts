
import { supabase } from "@/integrations/supabase/client";

export interface BatchProcessResult {
  processed: number;
  successful: number;
  skipped?: number;
  errors: string[];
  isComplete: boolean;
  nextStartRow: number;
  totalRows: number;
}

export class CsvUploadService {
  private static async processBatch(
    functionName: string,
    payload: any,
    signal?: AbortSignal
  ): Promise<BatchProcessResult> {
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

  static async processTeamsCsv(
    csvData: string,
    fileType: 'csv' | 'xlsx' = 'csv',
    batchSize: number = 100,
    onProgress?: (result: BatchProcessResult) => void,
    signal?: AbortSignal,
    startingRow: number = 1
  ): Promise<BatchProcessResult> {
    let startRow = startingRow;
    let totalProcessed = 0;
    let totalSuccessful = 0;
    let totalSkipped = 0;
    let allErrors: string[] = [];
    let isComplete = false;

    while (!isComplete) {
      // Check if operation was aborted
      if (signal?.aborted) {
        throw new DOMException('Operation was aborted', 'AbortError');
      }

      const result = await this.processBatch('process-teams-csv', {
        csvData,
        fileType,
        startRow,
        batchSize,
      }, signal);

      totalProcessed += result.processed;
      totalSuccessful += result.successful;
      totalSkipped += (result.skipped || 0);
      allErrors = [...allErrors, ...result.errors];
      
      startRow = result.nextStartRow;
      isComplete = result.isComplete;

      const progressResult: BatchProcessResult = {
        processed: totalProcessed,
        successful: totalSuccessful,
        skipped: totalSkipped,
        errors: allErrors,
        isComplete,
        nextStartRow: startRow,
        totalRows: result.totalRows,
      };

      if (onProgress) {
        onProgress(progressResult);
      }

      if (!isComplete) {
        // Check again before delay
        if (signal?.aborted) {
          throw new DOMException('Operation was aborted', 'AbortError');
        }
        
        // Small delay between batches to prevent overwhelming the edge function
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      processed: totalProcessed,
      successful: totalSuccessful,
      skipped: totalSkipped,
      errors: allErrors,
      isComplete: true,
      nextStartRow: startRow,
      totalRows: totalProcessed,
    };
  }

  static async processContactsCsv(
    csvData: string,
    conflictResolutions: any[] = [],
    batchSize: number = 50,
    onProgress?: (result: BatchProcessResult) => void,
    signal?: AbortSignal,
    startingRow: number = 1
  ): Promise<BatchProcessResult> {
    let startRow = startingRow;
    let totalProcessed = 0;
    let totalSuccessful = 0;
    let allErrors: string[] = [];
    let isComplete = false;

    while (!isComplete) {
      // Check if operation was aborted
      if (signal?.aborted) {
        throw new DOMException('Operation was aborted', 'AbortError');
      }

      const result = await this.processBatch('process-contacts-csv', {
        csvData,
        conflictResolutions,
        startRow,
        batchSize,
      }, signal);

      totalProcessed += result.processed;
      totalSuccessful += result.successful;
      allErrors = [...allErrors, ...result.errors];
      
      startRow = result.nextStartRow;
      isComplete = result.isComplete;

      const progressResult: BatchProcessResult = {
        processed: totalProcessed,
        successful: totalSuccessful,
        errors: allErrors,
        isComplete,
        nextStartRow: startRow,
        totalRows: result.totalRows,
      };

      if (onProgress) {
        onProgress(progressResult);
      }

      if (!isComplete) {
        // Check again before delay
        if (signal?.aborted) {
          throw new DOMException('Operation was aborted', 'AbortError');
        }
        
        // Small delay between batches to prevent overwhelming the edge function
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      processed: totalProcessed,
      successful: totalSuccessful,
      errors: allErrors,
      isComplete: true,
      nextStartRow: startRow,
      totalRows: totalProcessed,
    };
  }
}
