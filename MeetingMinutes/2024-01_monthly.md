---
title: "2024-01 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**January 2024**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?

- **Discussion with core developer Christian Kuhn**
  - The removal of `sys_language_uid` -1 was noted as a primary goal
  - Alternative ways for "All Languages" functionality were discussed (bool field at default language level)
  - Definition of the goal of converting the integer storage of languages to string (according to BCP47)
  - Discussion of a possible workflow for major core changes such as these 
  - We emphasized the importance of functional tests
  - Discussion about the pros and cons of the origUid `t3_origuid` field
  - Definition of an approximate roadmap for the initiative
- **Further examination of the PageRepository**
  - Understanding the changes since version 12
  - Questioning and discussing the distinction between pages and content
  - Critical examination of the public state of the `getPageOverlay` and `getPagesOverlay` methods
- **Further discussions on the default language**
  - Discussion of the pros and cons of a content-less structure layer vs. variability of the default language status of a language
- **Further familiarization with methods for documenting our results**
  - Identification of Xhprof as a way to analyze the code path of certain processes
  - Discussion about possible benefits of automated code documentation
- **Development of our translation handling extension**
  - Auto-creation of test content in the Free/Connected/Mixed modes
  - Further development of the front-end output for better traceability
  - Addressing current performance issues when initializing test data based on the DataHandler

## What will happen until the next report?

- Further familiarisation with the core processes, in particular with regard to the use of `sys_language_uid` -1
- To familiarize ourselves with the process, we are looking for entry points to contribute to the core code
- Discussion of the current development status of the TransFusion Extension and the underlying functionality
- Further documentation of our findings

## Any scope changes?
- So far, nothing has changed in the scope of our initiative.
- Our website is up to date.
- We are currently continuing to pursue our previously mentioned focal points. These have not changed since the initiative was founded.

## Need help?

- No, currently not

## Any last words

- The discussions with Christian Kuhn were very informative. Our immediate goals in terms of contributing to the core code were clarified.
- We now hope to find a way into the core contribution soon.
- Unfortunately, this month we also had to contend with absences due to illness and a heavy workload for various team members outside of the work of the initiative.

## January Team Meeting Minutes

- [2024-01-05, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/q1euU_wMt)
- [2024-01-12, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/ANe0QizZ2)
- [2024-01-19, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/sEONb4kd6)