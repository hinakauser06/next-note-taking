export default function HeaderText(props: any) {
  const { title } = props;
  return (
    <>
      <h2 className="text-center" style={{fontSize: '50px'}}>{title}</h2>
    </>
  );
}
