# Task: Pipeline Flow Track C — Security

Status: done

Track: B
Track reason: data addition to existing component — no new visual surface or pattern

## Problem
The "How the pipeline works" section only shows Track A and Track B. Users have no way to understand how the `/security` skill fits into the pipeline flow.

## Goal
A third entry in the PipelineFlow section describes the security track: invoke /security, Nehemiah audits and writes a report, hands off to /product, which creates a fix task for /developer.

## Requirements
- Add Track C entry to `src/components/PipelineFlow/PipelineFlow.constants.ts`
- Label: "Track C — Security Audit"
- Description: explains that /security scans for vulnerabilities, writes a report, and feeds findings back into the pipeline as a developer fix task
- Steps: You → /security → /product → /developer → /product

## Constraints
- Data change only — no modifications to the PipelineFlow component or CSS

## Out of scope
- Any visual changes to how tracks are rendered

## Implementation Notes
- Files created/modified:
  - `src/components/PipelineFlow/PipelineFlow.constants.ts`
- Deviations from task requirements: none
- New design tokens used: none

## Completion Summary
Added Track C — Security Audit to the PipelineFlow constants. The "How the pipeline works" section on the skills page now shows three tracks: A (full pipeline), B (fast track), and C (security audit). Track C documents the /security → /product → /developer → /product flow with Nehemiah's audit step. Confirmed by user on 2026-06-10.
