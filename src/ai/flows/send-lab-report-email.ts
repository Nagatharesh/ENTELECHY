
'use server';
/**
 * @fileOverview A flow to simulate sending an email with lab reports.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendLabReportEmailInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  recipientEmail: z.string().email().describe('The email address of the recipient.'),
  labReports: z.string().describe('A JSON string of the lab reports to be sent.'),
});
export type SendLabReportEmailInput = z.infer<typeof SendLabReportEmailInputSchema>;

const SendLabReportEmailOutputSchema = z.object({
  status: z.string().describe('The status of the email sending simulation.'),
  emailBody: z.string().describe('The generated body of the email.'),
});
export type SendLabReportEmailOutput = z.infer<typeof SendLabReportEmailOutputSchema>;

export async function sendLabReportEmail(input: SendLabReportEmailInput): Promise<SendLabReportEmailOutput> {
  return sendLabReportEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendLabReportEmailPrompt',
  input: {schema: SendLabReportEmailInputSchema},
  output: {schema: SendLabReportEmailOutputSchema},
  prompt: `You are an AI assistant tasked with preparing an email. The user wants to send lab reports for a patient to a specific email address.

Generate a professional and clear email body containing the lab reports. Do not generate email headers like "To:", "From:", or "Subject:".

Patient Name: {{{patientName}}}
Recipient Email: {{{recipientEmail}}}

Lab Reports (JSON format):
{{{labReports}}}

Format your output as a JSON object with 'status' and 'emailBody'. For the status, just say "Email prepared for sending.".`,
});

const sendLabReportEmailFlow = ai.defineFlow(
  {
    name: 'sendLabReportEmailFlow',
    inputSchema: SendLabReportEmailInputSchema,
    outputSchema: SendLabReportEmailOutputSchema,
  },
  async input => {
    // In a real application, you would integrate an email sending service here (e.g., SendGrid, Mailgun).
    // For this simulation, we will just generate the email content.
    console.log(`SIMULATING sending email to ${input.recipientEmail}`);
    
    const {output} = await prompt(input);
    
    console.log("--- SIMULATED EMAIL ---");
    console.log(`To: ${input.recipientEmail}`);
    console.log(`Subject: Your Lab Reports for ${input.patientName}`);
    console.log(output?.emailBody);
    console.log("-----------------------");
    
    return {
      status: `Simulated email successfully prepared for ${input.recipientEmail}`,
      emailBody: output?.emailBody || 'Could not generate email body.',
    };
  }
);
