import { useState, useEffect, useRef } from "react";
import { Table, DataBox, SearchBox, DeleteBox } from "../../components";

//Hooks
import useImageExercisesHook from "./hooks/index";

//Styles
import "./style.scss";

const ImageExercises = () => {
  const {
    getImageExercises,
    deleteImageExercise,
    addImageExercise,
    editImageExercise,
  } = useImageExercisesHook();

  const [imageExercises, setImageExercises] = useState([]);
  const [addBoxVisible, setAddBoxVisible] = useState(false);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);

  const [imageExerciseObj, setImageExerciseObj] = useState({
    _id: 0,
    title: "",
    description: "",
    images: [],
    createDate: "",
  });

  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    (async () => {
      const result = await getImageExercises();

      if (result) {
        setImageExercises(result);
      }
    })();
  }, []);

  useEffect(() => {
    if (addBoxVisible)
      setImageExerciseObj({
        _id: 0,
        title: "",
        description: "",
        images: [],
        createDate: "",
      });
  }, [addBoxVisible]);

  const onClickEdit = (_id) => {
    const imageExercise = imageExercises.find((u) => u._id === _id);
    setImageExerciseObj(imageExercise);
    setEditBoxVisible(true);
  };
  const onClickDelete = (_id) => {
    setImageExerciseObj(imageExercises.find((u) => u._id === _id));
    setDeleteBoxVisible(true);
  };

  return (
    <>
      <DeleteBox
        visible={deleteBoxVisible}
        setVisible={setDeleteBoxVisible}
        title={`حذف التمرين رقم ${imageExerciseObj._id}`}
        onDelete={async () => {
          if (await deleteImageExercise(imageExerciseObj._id)) {
            setImageExercises(
              imageExercises.filter((u) => u._id !== imageExerciseObj._id)
            );
            setDeleteBoxVisible(false);
          }
        }}
      />
      <DataBox
        visible={addBoxVisible}
        setVisible={setAddBoxVisible}
        options={{
          title: "اضافة تمرين جديد",
          onSave: async () => {
            const imageExercise = await addImageExercise(addFormRef);
            if (imageExercise) {
              setImageExercises([...imageExercises, imageExercise]);
              setAddBoxVisible(false);
            }
          },
          btnSave: "اضافة",
          formRef: addFormRef,
        }}
        inputs={[
          {
            tag: "input",
            label: "عنوان التمرين",

            props: {
              type: "text",
              name: "title",
              maxLength: 100,
              placeholder: "عنوان التمرين",
              required: true,
              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  title: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "محتوي التمرين",
            props: {
              type: "text",
              name: "description",
              placeholder: "محتوي التمرين",
              required: true,

              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  description: e.target.value,
                }),
            },
          },
          {
            tag: "input",
            label: "الصور",
            props: {
              type: "file",
              accept: ".jpg, .png, .jpeg",
              name: "images",
              placeholder: "الصور",
              multiple: true,
              required: true,

              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  images: e.target.files,
                }),
            },
          },
        ]}
      />
      <DataBox
        visible={editBoxVisible}
        setVisible={setEditBoxVisible}
        options={{
          title: `تعديل التمرين رقم ${imageExerciseObj._id}`,
          onSave: async () => {
            const result = await editImageExercise(editFormRef);
            if (result) {
              setImageExercises(
                imageExercises.map((u) => (u._id === result._id ? result : u))
              );
              setEditBoxVisible(false);
            }
          },
          saveBtn: "تعديل",
          formRef: editFormRef,
        }}
        inputs={[
          {
            tag: "input",
            props: {
              type: "hidden",
              value: imageExerciseObj._id,
              name: "_id",
            },
          },
          {
            tag: "input",
            label: "عنوان التمرين",
            props: {
              type: "text",
              value: imageExerciseObj.title,
              name: "title",
              placeholder: "عنوان التمرين",
              required: true,
              maxLength: 100,
              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  title: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "محتوي التمرين",
            props: {
              type: "text",
              value: imageExerciseObj.description,
              name: "description",
              placeholder: "محتوي التمرين",
              required: true,
              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  description: e.target.value,
                }),
            },
          },
          {
            tag: "input",
            label: "الصور",
            props: {
              type: "file",
              accept: ".jpg, .png, .jpeg",
              multiple: true,
              placeholder: "الصور",
              name: "images",
              onChange: (e) =>
                setImageExerciseObj({
                  ...imageExerciseObj,
                  images: e.target.files,
                }),
            },
          },
        ]}
      />
      <div className="main-container">
        <div className="page-position">
          <h2>لوحة التحكم</h2>
          <p>/</p>
          <h6>تمارين رياضية (صور)</h6>
        </div>
        <div className="container">
          <SearchBox />
          <div className="add-new">
            <button
              className="btn-add-new"
              onClick={() => setAddBoxVisible(true)}
            >
              أضف جديد
            </button>
          </div>
          <Table
            actions={{
              edit: onClickEdit,
              delete: onClickDelete,
            }}
            headers={[
              "#",
              "الصور",
              "العنوان",
              "محتوي التمرينة",
              "تاريخ الإضافة",
            ]}
            data={
              imageExercises &&
              imageExercises.map((u) => [
                u._id,
                { type: "slider", images: u.images },
                u.title,
                u.description,
                u.createDate,
              ])
            }
          />
        </div>
      </div>
    </>
  );
};

export default ImageExercises;
