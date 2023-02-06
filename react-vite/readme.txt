-- Utilities are for static functionality that does not depend on a state. 
-- Once you call a function, it gets the job done and nothing further.

I try to keep it simple for my developers

React Query - Server side state and query management, very nice to keep your application up to date with the server without making too many requests

Redux - Application level client side state, this is stuff that your entire application needs and might have some complexity behind it.

Context - Component or page state, this is maybe a group of components that share some data or state.

All three of these tools are very useful and have big advantages, Redux can be very useful for managing stage, and the dev tools are fantastic.

My rule of thumb with development that I enforce on my team is to not solve a problem before it’s a problem.

Generally we will start the project using React Query because we are familiar with that pattern and it’s effective. We typically won’t implement context or Redux until we come across a problem that requires one of them to fix it. Context normally ends up getting implemented somewhere before Redux, but I think that’s natural. If context starts getting too complicated or we are storing a lot of state that is changing often, we start looking to redux to solve that issue.

TLDR

All of these tools are great and have their own purpose, none are a replacement for each other. Don’t reach for a tool to solve a problem you don’t yet have

Hope this helps