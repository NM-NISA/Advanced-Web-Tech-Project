import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import extract from 'pdf-text-extract';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeAnalysis } from './interfaces/resume-analysis.interface';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async extractTextFromPdf(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      extract(filePath, (err: any, pages: string[]) => {
        if (err) {
          return reject(err);
        }
        // Join all pages into one text string
        resolve(pages.join('\n'));
      });
    });
  }

  async analyzeResume(cvPath: string, jobDescription: string) : Promise<ResumeAnalysis> {
    const cvText = await this.extractTextFromPdf(cvPath);

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });

    const prompt = `
You are an advanced AI recruitment assistant.

Analyze the candidate CV against the job description.

Return:
1. Match score percentage
2. Candidate strengths
3. Missing skills
4. Final recommendation

JOB DESCRIPTION:
${jobDescription}

CANDIDATE CV:
${cvText}

IMPORTANT:
Return ONLY valid JSON.

Format:
{
  "score": number,
  "strengths": [],
  "missingSkills": [],
  "recommendation": ""
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    function normalizeScore(rawScore: number): number {
      if (rawScore < 0) return 0;
      if (rawScore > 100) return 100;
      return Math.round(rawScore);
    }


    const cleanedResponse = response
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed: ResumeAnalysis = JSON.parse(cleanedResponse);

    // Normalize score
    parsed.score = normalizeScore(parsed.score);

    return parsed;
  }
}
