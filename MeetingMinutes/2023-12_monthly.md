---
title: "2023-12 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**December 2023**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?

- **Further elaboration of the community survey on translation handling**
  - We continued to work on developing the basic pool of questions for our survey based on ChatGPT. However, this activity was not the main focus in December.
- **Understanding core functionality of Language Fallback Types**
  - We have been working more intensively on the language fallback types that can be configured in the site configuration
  - In this context, we were able to clarify various questions of understanding, but new questions also arose
  - We came to the realization that there are too many places in the code that take language fallback types into account and cause corresponding changes. We want to make this easier to understand and streamline in future.
- **Ways of documenting our findings**
  - We have investigated how we can document our findings (currently especially on language fallback types)
  - We currently want to make attempts to build up our findings based on Markdown in our GitHub team in a corresponding repository.
  - We want to use the [Mermaid](https://github.com/mermaid-js/mermaid) Syntax to make the processes to be analyzed in the code more visible as a diagram.
- **Development of our translation handling extension**
  - We have further expanded the functionality of the extension.
  - New page trees can now be created via the command line for testing purposes in the various language fallback types
  - Attention has been paid to language neutrality for language identifiers (use of color names)
  - All conceivable combinations of language fallback types and fallback chain configuration were implemented
- **Development of our translatable page tree prototype**
  - In the current state, the information required to display the different languages is already delivered to the backend interface.
  - The challenge now is to use the data with the help of TypeScript in such a way that the PageTree is functionally enriched accordingly.

## What will happen until the next report?

- First steps regarding the documentation of our findings on language fallback types
- Further expansion of our translation handling extension and use of this to formulate the test cases to be documented
- Further development of our translatable page tree prototype
- Further development of the basic question pool for our survey (based on our findings from the core analysis, among other things)
- Jo has been awarded the community budget idea "TransFusion Extension for CMS >= 12" and will implement the corresponding prototype in parallel to the work in our initiative. We also hope to gain new insights into free/connected/mixed content modes from his work. We want to check the functionality of the prototype with the help of our testing extension.

## Any scope changes?
- So far, nothing has changed in the scope of our initiative.
- Our website is up to date.
- We are currently continuing to pursue our previously mentioned focal points. These have not changed since the initiative was founded.

## Need help?

- We are currently at a point where we need to talk to core developers about our ideas and questions. This is necessary in order to shape the future direction of our initiative in line with the ideas of the core team.
- In this context, we have already contacted our bridge Anja Leichsenring. She is currently working on establishing a corresponding contact.
- What is interesting for the work in our initiative is how great the desire for improvements in the context of free/connected/mixed content modes is in the TYPO3 community. In this context, is it possible to gain more insights into the outcome of the election from the Community Budget Ideas? At the moment, we only know that the decision was made without knowing the numbers.

## Any last words

- Apart from the general consideration of functionalities in TYPO3, it was important to get a picture of the internal concrete functionalities in the core code,
- We have now been able to sharpen our idea of the possible effort involved in our proposed ideas.
- Even though many of our ideas involve a lot of effort, we are still motivated to contribute to sustainable positive changes in translation handling.
- We are excited to see what the upcoming discussions with the core developers will reveal.

## December Team Meeting Minutes

- [2023-12-01, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/L1aLsRB1_)
- [2023-12-15, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/ddSKDuz1Q)
- [2023-12-22, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/lbLlUw9-6)
- [2023-12-29, 11:00 am to 12:00 am CET](https://notes.typo3.org/s/8gjJkDDt_)