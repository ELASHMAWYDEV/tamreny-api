import { useState, useEffect, useRef } from "react";
import { Table, DataBox, SearchBox, DeleteBox } from "../../components";

//Hooks
import useHallsHook from "./hooks/index";

//Styles
import "./style.scss";

const Halls = () => {
  const { getHalls, deleteHall, addHall, editHall } = useHallsHook();

  const [halls, setHalls] = useState([]);
  const [addBoxVisible, setAddBoxVisible] = useState(false);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);

  const [hallObj, setHallObj] = useState({
    _id: 0,
    name: "",
    city: "",
    brief: "",
    subscriptions: "",
    images: [],
    createDate: "",
  });

  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    (async () => {
      const result = await getHalls();

      if (result) {
        setHalls(result);
      }
    })();
  }, []);

  useEffect(() => {
    if (addBoxVisible)
      setHallObj({
        _id: 0,
        name: "",
        city: "",
        brief: "",
        subscriptions: "",
        images: [],
        createDate: "",
      });
  }, [addBoxVisible]);

  const onClickEdit = (_id) => {
    const hall = halls.find((u) => u._id === _id);
    setHallObj(hall);
    setEditBoxVisible(true);
  };
  const onClickDelete = (_id) => {
    setHallObj(halls.find((u) => u._id === _id));
    setDeleteBoxVisible(true);
  };

  return (
    <>
      <DeleteBox
        visible={deleteBoxVisible}
        setVisible={setDeleteBoxVisible}
        title={`حذف القاعة رقم ${hallObj._id}`}
        onDelete={async () => {
          if (await deleteHall(hallObj._id)) {
            setHalls(halls.filter((u) => u._id !== hallObj._id));
            setDeleteBoxVisible(false);
          }
        }}
      />
      <DataBox
        visible={addBoxVisible}
        setVisible={setAddBoxVisible}
        options={{
          title: "اضافة قاعة جديد",
          onSave: async () => {
            const hall = await addHall(addFormRef);
            if (hall) {
              setHalls([...halls, hall]);
              setAddBoxVisible(false);
            }
          },
          btnSave: "اضافة",
          formRef: addFormRef,
        }}
        inputs={[
          {
            tag: "input",
            label: "اسم القاعة",

            props: {
              type: "text",
              name: "name",
              maxLength: 100,
              placeholder: "اسم القاعة",
              required: true,
              defaultValue: hallObj.name,
              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  name: e.target.value,
                }),
            },
          },
          {
            tag: "input",
            label: "المدينة",
            props: {
              type: "text",
              name: "city",
              maxLength: 100,
              placeholder: "المدينة",
              required: true,
              defaultValue: hallObj.city,

              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  city: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "وصف القاعة",
            props: {
              type: "text",
              name: "brief",
              placeholder: "وصف القاعة",
              required: true,
              defaultValue: hallObj.brief,

              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  brief: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "الاشتراكات",
            props: {
              type: "text",
              name: "subscriptions",
              placeholder: "مثال:\n 150,شهري\n1200,سنوي",
              required: true,
              defaultValue: hallObj.subscriptions,
              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  subscriptions: e.target.value,
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
                setHallObj({
                  ...hallObj,
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
          title: `تعديل القاعة رقم ${hallObj._id}`,
          onSave: async () => {
            const result = await editHall(editFormRef);
            if (result) {
              setHalls(halls.map((u) => (u._id === result._id ? result : u)));
              setEditBoxVisible(false);
            }
          },
          saveBtn: "تعديل",
          formRef: editFormRef,
        }}
        inputs={[
          {
            tag: "input",
            label: "اسم القاعة",

            props: {
              type: "text",
              name: "name",
              maxLength: 100,
              placeholder: "اسم القاعة",
              required: true,
              defaultValue: hallObj.name,
              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  name: e.target.value,
                }),
            },
          },
          {
            tag: "input",
            label: "المدينة",
            props: {
              type: "text",
              name: "city",
              maxLength: 100,
              placeholder: "المدينة",
              required: true,
              defaultValue: hallObj.city,

              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  city: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "وصف القاعة",
            props: {
              type: "text",
              name: "brief",
              placeholder: "وصف القاعة",
              required: true,
              defaultValue: hallObj.brief,

              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  brief: e.target.value,
                }),
            },
          },
          {
            tag: "textarea",
            label: "الاشتراكات",
            props: {
              type: "text",
              name: "subscriptions",
              placeholder: "مثال:\n 150,شهري\n1200,سنوي",
              required: true,
              defaultValue:
                hallObj.subscriptions &&
                hallObj.subscriptions.map(
                  (item) => item.price + "," + item.name + "\n"
                ),
              onChange: (e) =>
                setHallObj({
                  ...hallObj,
                  // subscriptions: e.target.value,
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
                setHallObj({
                  ...hallObj,
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
          {/*<SearchBox />*/}
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
              "اسم القاعة",
              "الصور",
              "وصف القاعة",
              "المدينة",
              "المكان",
              "الاشتراكات",
              "تاريخ الإضافة",
            ]}
            data={
              halls &&
              halls.map((u) => [
                u._id,
                u.name,
                { type: "slider", images: u.images },
                u.brief,
                u.city,
                { type: "location", location: u.location },
                `${u.subscriptions.map((s) => s.price + " " + s.name)}`,
                u.createDate,
              ])
            }
          />
        </div>
      </div>
    </>
  );
};

export default Halls;
