# Kanban App

In this project I use several additional packages to make my work easier, here's a list of packages that I use : 

1. **Management State** : react-redux, redux-toolkit
2. **Styling** : react-boostrap, react-toastify,sass
3. **Navigation** : react-router-dom
4. **Data Fetching** : axios, jwt-decode 
5. **Drag n Drop** : react-beautiful-dnd

Here are the challenges I experienced and how I solved them :

1. **Fetching Data Todo and Task**
I think the first problem I found was the separation of the todo group endpoint and the task endpoint, so if we want to display as designed I have to do fetch 2 times, first fetch to get the todo group, then I loop the response result and I do fetch task from the results of the loop. There is an easy way to do this, which is that I can do it with just the first fetch, but the loading will be very long, if that's why I did 2 steps. That is, the first fetch is to get the todo group, then each todo will fetch its own task, I think it's lighter.

2. **Update Data after Action**
In my opinion, the second obstacle is when after taking actions and updating data, so in this project I only did fetcing data once, namely when the webapp was first loaded, after performing the actions the updated data was purely data manipulation from the frontend. I think this will greatly reduce the performance of the webapp

Here's a screenshot from the website

<img width="1552" alt="image" src="https://user-images.githubusercontent.com/25057235/188149747-694d176d-7f8e-45ab-97d5-d99483174dbf.png">
<img width="1552" alt="image" src="https://user-images.githubusercontent.com/25057235/188149831-a2f1b464-f3da-458b-aa8f-3ebfe9b0354a.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/25057235/188149884-091f9af7-d9db-4a02-8273-bcc30b8ac43d.png">
<img width="1552" alt="image" src="https://user-images.githubusercontent.com/25057235/188149942-8eeebf73-505c-424c-b784-5cfa3b1f3868.png">
