import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import coursesData from "./courses.json";
import {
  FaArrowUp,
  FaArrowDown,
  FaTrashAlt,
  FaEllipsisH,
} from "react-icons/fa";

function CourseList() {
  const [courses, setCourses] = useState(coursesData.initialCourses);
  const [visibleButtons, setVisibleButtons] = useState(
    Array(coursesData.initialCourses.length).fill(false)
  );

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCourses = Array.from(courses);
    const [movedCourse] = reorderedCourses.splice(result.source.index, 1);
    reorderedCourses.splice(result.destination.index, 0, movedCourse);

    setCourses(reorderedCourses);
  };

  const handleMoveToTop = (index) => {
    const reorderedCourses = Array.from(courses);
    const [movedCourse] = reorderedCourses.splice(index, 1);
    reorderedCourses.unshift(movedCourse);

    setCourses(reorderedCourses);
    toggleButtons(index); // Hide buttons after move
  };

  const handleMoveToBottom = (index) => {
    const reorderedCourses = Array.from(courses);
    const [movedCourse] = reorderedCourses.splice(index, 1);
    reorderedCourses.push(movedCourse);

    setCourses(reorderedCourses);
    toggleButtons(index); // Hide buttons after move
  };

  const handleRemove = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    toggleButtons(index); // Hide buttons after removal
  };

  const toggleButtons = (index) => {
    const updatedVisibility = Array(courses.length).fill(false);
    setVisibleButtons(updatedVisibility);
  };

  const handleEllipsisClick = (index) => {
    const updatedVisibility = [...visibleButtons];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleButtons(updatedVisibility);
  };

  return (
    <div className="course-list-bg">
      <div className="flex flex-col justify-center items-center">
        <h1
          className="main-text text-4xl text-[#4F6F52] font-bold mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          Chai aur Code
        </h1>
        <div
          className="bg-[#F9F7F7] rounded-lg font-sans p-4 w-auto md:w-[50rem]"
          style={{
            boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <h1 className="text-[#313131] text-2xl font-bold">Manage Bundle</h1>
          <p className="text-[#4B4747]">
            Change orders of the products based on priority
          </p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {courses.map((course, index) => (
                    <Draggable
                      key={course.id}
                      draggableId={course.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            margin: "8px",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: "#F7F7F7",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <img
                            src={course.image}
                            alt={course.courseTitle}
                            style={{ width: "100px", height: "auto" }}
                          />
                          <h3 className="font-semibold">
                            {course.courseTitle}
                          </h3>
                          <p className="">{course.coursePrice}</p>
                          <p
                            className="bg-[#DBFFCE] p-1 text-sm rounded-sm"
                            style={{ border: "1px solid #7E7E7E" }}
                          >
                            {course.courseType}
                          </p>
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <FaEllipsisH
                              onClick={() => handleEllipsisClick(index)}
                              style={{
                                cursor: "pointer",
                                transform: "rotate(90deg)",
                              }}
                            />
                            {visibleButtons[index] && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  position: "absolute",
                                  top: "24px",
                                  left: "0px",
                                  width: "10.5rem",
                                  backgroundColor: "#F7F7F7",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                  zIndex: 10,
                                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                                }}
                              >
                                <button
                                  onClick={() => handleMoveToTop(index)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: "#F7F7F7",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                >
                                  <FaArrowUp style={{ marginRight: "8px" }} />
                                  Move to Top
                                </button>
                                <button
                                  onClick={() => handleMoveToBottom(index)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: "#F7F7F7",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                >
                                  <FaArrowDown style={{ marginRight: "8px" }} />
                                  Move to Bottom
                                </button>
                                <button
                                  onClick={() => handleRemove(index)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: "#F7F7F7",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    color: "#FA2D2D",
                                    textAlign: "left",
                                  }}
                                >
                                  <FaTrashAlt
                                    style={{
                                      marginRight: "8px",
                                      color: "#FA2D2D",
                                    }}
                                  />
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default CourseList;
